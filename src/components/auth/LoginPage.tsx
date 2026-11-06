import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SuperAdminLoginPage } from './SuperAdminLoginPage';
import { ParentLoginPage } from './ParentLoginPage';
import { StudentLoginPage } from './StudentLoginPage';
import { TeacherLoginPage } from './TeacherLoginPage';
import { PrincipalLoginPage } from './PrincipalLoginPage';
import { AccountantLoginPage } from './AccountantLoginPage';
import { WebsiteEditorLoginPage } from './WebsiteEditorLoginPage';

export const LoginPage: React.FC = () => {
  const { targetLoginRole } = useSchool();

  switch (targetLoginRole) {
    case 'super_admin':
      return <SuperAdminLoginPage />;
    case 'student':
      return <StudentLoginPage />;
    case 'teacher':
      return <TeacherLoginPage />;
    case 'principal':
      return <PrincipalLoginPage />;
    case 'accountant':
      return <AccountantLoginPage />;
    case 'website_editor':
      return <WebsiteEditorLoginPage />;
    case 'parent':
    default:
      return <ParentLoginPage />;
  }
};
