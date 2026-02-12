"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-widest">
            ZALORKUY
          </Link>

          <div className="flex items-center space-x-5">
            <User className="w-5 h-5 cursor-pointer hover:text-gray-600 transition" />
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-600 transition" />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
