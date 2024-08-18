import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useCart } from "@/context/useCart"

export function RemoveItems({productId}: {productId: number}) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button  className='font-semibold text-gray-600 transition-all duration-300 hover:text-indigo-600'>Remove</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Item</DialogTitle>
            <DialogDescription>
            Are you sure you want to remove this item?
            </DialogDescription>
          </DialogHeader>
          <ProfileForm  productId = {productId}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Remove Item</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Remove Item</DrawerTitle>
          <DrawerDescription>
            
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm productId = {productId} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className = "", productId }: { className?: string, productId: number }) {
    const {handleRemoveFromCart}  = useCart();
  const handleOnClickRemove = () => {
    handleRemoveFromCart(productId);
};
  return (
    <form className={cn("grid items-start gap-4 pt-4", className)}>
        <div className="flex gap-x-2">
      <Button variant={"secondary"}>Cancel</Button>
      <Button variant={"destructive"} onClick={() => handleOnClickRemove()}>Remove</Button>
        </div>
    </form>
  )
}
