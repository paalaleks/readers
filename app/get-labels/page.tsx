import NavBack from "@/components/NavBack";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <main className="screenMinHeight nav-content-footer flex flex-col justify-center items-center max-w-5xl mx-auto">
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 w-full">
        <NavBack />
      </nav>
      <div className="animate-in flex flex-col justify-center items-center gap-4 px-4 sm:px-8 flex-1">
        <header className="flex justify-center">
          <Image
            alt="Hero image"
            src="/images/product.png"
            width={768}
            height={200}
          />
        </header>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, rerum.
        </p>
        <div className="flex items-center justify-center">
          <Button variant={"secondary"}>
            <Minus size={16} />
          </Button>
          <span className="w-8 text-center">1</span>
          <Button variant={"secondary"}>
            <Plus size={16} />
          </Button>
        </div>
        <Button className="w-full max-w-sm">Go to Checkout</Button>
      </div>
    </main>
  );
}
