"use client"

import React from "react"
import { useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "../mode-toggle"
import { Separator } from "../ui/separator"
import { UserProfile } from "./UserProfile"

const NavBar = () => {
  const pathname = useLocation().pathname
  const segments = pathname.split("/").filter(Boolean)

  // build breadcrumb items dynamically
  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, " ")

    return { label, href }
  })

  return (
    <div className="sticky top-0 z-50 flex-1 right-0 p-3 flex justify-between items-center dark:bg-slate-900 bg-slate-100 shadow-md">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2 bg-slate-200" />
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            {crumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === crumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-2 items-center">
        <UserProfile />
        <ModeToggle />
      </div>
    </div>
  )
}

export default NavBar
