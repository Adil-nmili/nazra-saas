import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [active,setActive] = useState(true);

  useEffect(() : void => {
   if(active == true) {
    setTheme('dark')
   } else {
     setTheme('light')
   }
  }, [active, setTheme])


  return (
    <Button variant={'outline'} size={'icon'}  onClick={() => setActive(!active)}>
      {
        active ? (<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"  />) : (<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />)
      }
    </Button>
  )
}