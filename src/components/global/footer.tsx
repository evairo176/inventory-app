import React from "react";
import Logo from "./logo";
import {
  Copyright,
  Facebook,
  Headset,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { footer } from "@/config/footer";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="px-10 py-8">
      <div className="md:container">
        <div className="grid grid-cols-12 gap-6 border-b border-gray-200 py-10">
          <div className="col-span-full lg:col-span-4">
            {footer.logo}
            <p className="my-3 line-clamp-3 text-xs">{footer.summary}</p>
            <div className="space-y-2">
              {footer.contact.map((row, key) => {
                const Icon = row.icon;
                return (
                  <div key={key} className="flex items-center gap-1">
                    <Icon className="h-4 w-4" />
                    <p className="text-xs">{row.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {footer.navigation.map((row, key) => {
            return (
              <div key={key} className="col-span-full lg:col-span-2">
                <h2 className="text-base font-semibold">{row.title}</h2>
                <div className="flex flex-col gap-3 py-2">
                  {row.links.map((children, childrenKey) => {
                    return (
                      <Link
                        key={childrenKey}
                        className="text-xs"
                        href={children.path}
                      >
                        {children.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between space-y-1 py-3 text-xs">
          <div className="flex flex-wrap items-center space-x-2 space-y-1">
            <Copyright className="h-4 w-4" />
            <span>{new Date().getFullYear()}</span>
            <span>Stokify - </span>
            <span>All rights reserved</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={"#"}>Terms and Conditions</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href={"#"}>
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href={"#"}>
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href={"#"}>
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href={"#"}>
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
