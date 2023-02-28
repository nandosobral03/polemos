import { Request } from "express";
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminWebp from 'imagemin-webp';
import imagemin, { type Plugin } from 'imagemin';
import playerRepo from './repository/players.repository';
const path = require('path');
const fs = require('fs');


export const getAuthUser = (request: Request) : string => {
    return JSON.parse(request.headers.authorization!).sub;
}

export const formatHttpError = (err: any) => {
    let status = 500;
    let message = "Internal server error";
    if(err.message) message = err.message;
    if(err.status) status = err.status;
    return {status, message};
}


export const compressImage = async (imageType:string, imageName:string) => {
    const imageDir = path.join(__dirname, "images");
    const imagePath = path.join(imageDir, `${imageName}${imageType}`);
    const compressedImagePath = path.join(imageDir, `compressed`);
    try{
        let plugins:Plugin[] = [];
        switch(imageType.replace(".", "")){
            case "png":
                plugins = [imageminPngquant({quality: [0.6, 0.7]})];
                break;
            case "jpeg":
                plugins = [imageminMozjpeg({quality: 70})];
                break;
            case "gif":
                plugins = [imageminGifsicle ({interlaced: true, optimizationLevel: 3})];
                break;
            case "webp":
                plugins = [imageminWebp({quality: 70})];
                break;
        }
        console.log("Compressing image");
        const res = await imagemin([imagePath], {
            plugins,
            destination: compressedImagePath,
            glob: false
        });
        console.log("Compressed image")
    }
    catch(err){
        console.error("Error compressing image, saving original");
        fs.copyFileSync(imagePath, path.join(compressedImagePath, `${imageName}${imageType}`));
    }
    finally{
        await playerRepo.setCompressedImage(imageName, imageType);
        fs.unlinkSync(imagePath);
        {
            const files = fs.readdirSync(compressedImagePath);
            const toRemove = files.filter((file: string) => file.startsWith(`${imageName}.`));
            toRemove.forEach((file: any) => {
                if(file !== `${imageName}${imageType}`){
                    fs.unlinkSync(path.join(compressedImagePath, file));
                }
            });
        }
    }
}


export const deleteImage = (player_id: string) => {
    const imageDir = path.join(__dirname, "images");
    const compressedImagePath = path.join(imageDir, `compressed`);
    const files = fs.readdirSync(imageDir);
    const toRemove = files.filter((file: string) => file.startsWith(`${player_id}.`));
    toRemove.forEach((file: any) => {
        fs.removeFileSync(path.join(imageDir, file));
    });
    const filesCompressed = fs.readdirSync(compressedImagePath);
    const toRemoveCompressed = filesCompressed.filter((file: string) => file.startsWith(`${player_id}.`));
    toRemoveCompressed.forEach((file: any) => {
        fs.removeFileSync(path.join(compressedImagePath, file));
    });
}