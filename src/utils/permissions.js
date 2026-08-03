
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    EDITOR: 'editor',
    AUTHOR: 'author',
    CONTRIBUTOR: 'contributor',
};

export const PERMISSIONS = {

    canAccessRoute: (role, routeId) => {
        
        if (role === ROLES.SUPER_ADMIN) return true; 
        
        switch (routeId) {
            case 'dashboard':
            case 'posts':
            case 'media':
                return [ROLES.EDITOR, ROLES.AUTHOR, ROLES.CONTRIBUTOR].includes(role);
            case 'pages':
            case 'comments':
            case 'categories':
                return [ROLES.EDITOR].includes(role);
            case 'users':
            case 'settings':
            case 'analytics':
            case 'reports':
                return false; 
            default:
                return false;
        }
    },

    canDelete: (role) => {
        return [ROLES.SUPER_ADMIN, ROLES.EDITOR].includes(role);
    },

    canPublish: (role) => {
        return [ROLES.SUPER_ADMIN, ROLES.EDITOR].includes(role);
    }
};