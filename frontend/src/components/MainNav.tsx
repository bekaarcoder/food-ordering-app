import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import UserMenu from './UserMenu';

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UserMenu />
            ) : (
                <Button
                    onClick={async () => await loginWithRedirect()}
                    className="bg-orange-500 font-bold hover:bg-orange-400"
                >
                    Sign In
                </Button>
            )}
        </span>
    );
};

export default MainNav;
