import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
import { useAuth0 } from '@auth0/auth0-react';
import { Skeleton } from './ui/skeleton';

const Header = () => {
    const { isLoading } = useAuth0();

    return (
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-bold tracking-tight text-orange-500"
                >
                    Munchify
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    {isLoading ? (
                        <span className="flex space-x-2 items-center">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className=" h-5 w-[200px]" />
                        </span>
                    ) : (
                        <MainNav />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
