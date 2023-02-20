import express from 'express';
import cors from 'cors';
import * as authentication from './middlewares/authentication.middleware';
import fileUpload from 'express-fileupload';

import authRoutes from './routes/auth.routes';
import sponsorRoutes from './routes/sponsor.routes';
import teamRoutes from './routes/teams.routes';
import playerRoutes from './routes/players.routes';
import statusRoutes from './routes/status.routes';
import eventRoutes from './routes/events.routes';
import gameRoutes from './routes/game.routes';
import statRoutes from './routes/stats.routes';

const initialize = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload({
        createParentPath: true
    }));
    app.use('/static', express.static(__dirname + '/images'));
    app.use("/auth", authRoutes);
    
    app.use('/sponsors', authentication.verifyJWT, sponsorRoutes);
    app.use('/teams', authentication.verifyJWT, teamRoutes);
    app.use('/players', authentication.verifyJWT, playerRoutes);    
    app.use('/statuses', authentication.verifyJWT, statusRoutes);
    app.use('/events', authentication.verifyJWT, eventRoutes);
    app.use('/game', authentication.verifyJWT, gameRoutes);
    app.use('/stats', authentication.verifyJWT, statRoutes);
    
    app.listen(process.env.PORT, () => {
        console.log(`Ares running on ${process.env.URL}!`);
    });
};




export default initialize;