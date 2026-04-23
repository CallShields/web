'use client'

import Link from 'next/link'
import { createClient } from '../../supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { UserCircle, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0A2540] border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00D4AA] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0A2540]" />
            </div>
            <span className="text-white font-semibold text-lg">CallShields</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="text-white/70 hover:text-white text-sm transition-colors">
              Overview
            </Link>

          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
              <UserCircle className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={async () => {
              await supabase.auth.signOut()
              router.push("/")
              router.refresh()
            }}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

