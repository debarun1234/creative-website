import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Switch } from '@heroui/switch';
import { useState } from 'react';

interface NavbarProps {
  onAboutClick: () => void;
}

export const Navbar = ({ onAboutClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = ['Home', 'How to Use', 'Features', 'Converter', 'About'];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'about') {
      onAboutClick();
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="ArtConvert Logo" className="w-10 h-10" />
            <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ArtConvert
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer hover:text-blue-600 transition-colors font-medium"
            onPress={() => scrollToSection('home')}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer hover:text-blue-600 transition-colors font-medium"
            onPress={() => scrollToSection('how-to-use')}
          >
            How to Use
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer hover:text-blue-600 transition-colors font-medium"
            onPress={() => scrollToSection('features')}
          >
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer hover:text-blue-600 transition-colors font-medium"
            onPress={() => scrollToSection('converter')}
          >
            Converter
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer hover:text-blue-600 transition-colors font-medium"
            onPress={() => scrollToSection('about')}
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            size="sm"
            isSelected={isDark}
            onValueChange={toggleTheme}
            startContent={<span>☀️</span>}
            endContent={<span>🌙</span>}
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            variant="flat"
            className="font-bold"
            onPress={() => scrollToSection('converter')}
          >
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full cursor-pointer text-lg"
              size="lg"
              onPress={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
};
