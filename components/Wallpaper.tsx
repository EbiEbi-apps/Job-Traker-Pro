import React from 'react';
import { useWallpaper } from '../hooks/useWallpaper';

const wallpapers = {
    beach: 'bg-[url(https://i.ibb.co/hKw6yP3/beach.jpg)]',
    nature: 'bg-[url(https://i.ibb.co/PN4M81Z/nature.jpg)]',
    sky: 'bg-[url(https://i.ibb.co/9gXwL90/sky.jpg)]',
};

const Wallpaper: React.FC = () => {
    const { activeWallpaper, customWallpaper } = useWallpaper();

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-black">
            {Object.entries(wallpapers).map(([key, className]) => (
                <div
                    key={key}
                    className={`
                        absolute inset-0 bg-cover bg-center transition-opacity duration-1000
                        ${className}
                        ${activeWallpaper === key ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            ))}
            <div
                className={`
                    absolute inset-0 bg-cover bg-center transition-opacity duration-1000
                    ${activeWallpaper === 'custom' && customWallpaper ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ backgroundImage: `url(${customWallpaper})` }}
            />
        </div>
    );
};

export default Wallpaper;
