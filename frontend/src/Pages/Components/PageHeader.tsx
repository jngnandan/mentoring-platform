
        import React from 'react';
        import { Card, Image, Text, Group, Badge, Button, Loader, Grid, Breadcrumbs, Anchor } from '@mantine/core';
        import { Link } from 'react-router-dom';
        import { IconSmartHome } from '@tabler/icons-react';

            interface PageHeaderProps {
                title: string;
                description: string;
                page: string;
            }

            export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, page }) => {
                return (
                    <div className="bg-purple-400 py-6 px-8">
                         <Breadcrumbs py={20} color="white">
                            <Link to="/"><IconSmartHome/></Link> 
                            <Anchor>{page}</Anchor>
                        </Breadcrumbs>

                        <h1 className='text-3xl text-white font-semibold'>{title}</h1>
                        <p className='my-5 text-white'>{description}</p>
                    </div>
                );
            };
