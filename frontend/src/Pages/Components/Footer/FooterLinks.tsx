import React from 'react'
import { MantineLogo } from '@mantine/ds';

import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition, rem, Image } from '@mantine/core';

function FooterLinks() {
  
  const [scroll, scrollTo] = useWindowScroll();

      return (
        <>
          <footer className="m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
              {/* <MantineLogo size={30} /> */}
              <div className='flex flex-row items-center items-center gap-1'>
              <Image
                radius="md"
                src="./protocon.png"
                h={40}
                w={40}                
              />
              <Text size='lg' fw={600} color='gray' className='text-lg'>Protocon</Text>
              </div>
           
              
            <ul className="flex flex-wrap items-center my-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/about" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="/privacy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
      
                <li>
                    <a href="/contact" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Protocon</a>. All Rights Reserved.</span>
    </div>
</footer>
          {/* <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
              {(transitionStyles) => (
                <Button
                  leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                  style={transitionStyles}
                  onClick={() => scrollTo({ y: 0 })}
                >
                  Scroll top
                </Button>
              )}
            </Transition>
          </Affix> */}
        </>
      );
    }

export default FooterLinks