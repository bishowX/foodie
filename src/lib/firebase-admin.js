import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = getApps().length ? getApp() : initializeApp();

export const auth = getAuth(app);
