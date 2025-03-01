"use client";

import React from "react";
import { AppSidebar } from "@/components/element/app-sidebar";
import Logo from "@/components/Logo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import SwitchTheme from "@/components/theme/SwitchTheme";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathTree = pathname.replace("/", "").split("/");

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex flex-row items-center justify-between px-4">
                <Logo />
              </div>
              <Breadcrumb>
                <BreadcrumbList>
                  {pathTree.map((path, index) => {
                    const pathLink =
                      "/" + pathTree.slice(0, index + 1).join("/");
                    const isActive = pathLink === pathname;
                    const pathSlug =
                      path.charAt(0).toUpperCase() + path.slice(1);

                    return (
                      <React.Fragment key={`${path}-${index}`}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isActive ? (
                            <BreadcrumbPage>{pathSlug}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={pathLink}>
                              {pathSlug}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center">
              <SwitchTheme />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 m-4 pt-0">
            <div>{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default Layout;
