import NavBack from "@/components/NavBack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 min-[25rem]:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <fieldset className="border rounded-xl border-accent px-8 relative max-w-5xl mx-auto">
        <legend className="bg-background px-2 text-primary/70 h-0 flex items-center">
          <h3>Contact</h3>
        </legend>
        <form className="animate-in flex flex-col justify-center gap-4 px-8 mx-auto w-full max-w-2xl screenMinHeight -mb-32 -mt-28">
          <Label className="" htmlFor="email">
            Your Email
          </Label>
          <Input
            type="email"
            id="email"
            className=""
            name="email"
            placeholder="you@example.com"
            required
          />
          <Label className="" htmlFor="select">
            Select a topic
          </Label>
          <Select required>
            <SelectTrigger className="w-[180px]" id="select">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="repost a bug">Repost a bug</SelectItem>
                <SelectItem value="feature idea">Feature idea</SelectItem>
                <SelectItem value="label issue">Label issue</SelectItem>
                <SelectItem value="something else">Something else</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label className="" htmlFor="message">
            Your message
          </Label>
          <Textarea
            id="message"
            className="mb-2 min-h-[250px]"
            name="message"
            placeholder="What's on your mind?"
            required
            minLength={10}
          />
          <Button>Send messages</Button>
        </form>
      </fieldset>
    </>
  );
}
