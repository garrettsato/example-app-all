import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from "../components/ProtectedRoute";
import {AuthProvider} from "../providers/AuthProvider";
import ResponsiveDrawer from "../pages/DrawerPage";
import TaskPage from "../pages/TaskPage";
import {TasksContextProvider} from "../providers/TasksProvider";

const AppRouter: React.FC = () => {
  return (
      <AuthProvider>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <ResponsiveDrawer />
                    </ProtectedRoute>
                } />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/tasks' element={
                    <TasksContextProvider>
                        <TaskPage />
                    </TasksContextProvider>
                } />
            </Routes>
        </AuthProvider>
  );
};

export default AppRouter;