import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRoute from "./auth.route";
import ProfileRoute from "./profile.route";
import IncidentRoute from "./incident.route";
import AuditRoute from "./audit.route";
import ReportRoute from "./report.route";
import EvidenceRoute from "./evidence.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/incident",
        router: IncidentRoute,
    },
    {
        path: '/audit',
        router: AuditRoute,
    },
    {
        path: '/report',
        router: ReportRoute,
    },
    {
        path: "/evidence",
        router: EvidenceRoute,
    }
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
