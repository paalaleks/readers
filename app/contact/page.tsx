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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  return (
    <main className="screenMinHeight nav-content-footer flex flex-col justify-center items-center max-w-5xl mx-auto ">
      <nav className="flex flex-row justify-between items-center h-24 px-4 sm:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>

      <form
        action="https://formsubmit.co/paalakaasa@gmail.com"
        method="POST"
        className="animate-in flex flex-col justify-center w-full max-w-md gap-4 flex-1 pb-8 px-4"
      >
        <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
          Contact us
        </h1>
        <Label className="" htmlFor="email">
          Your Email
        </Label>
        <input type="hidden" name="_captcha" value="false"></input>
        <input
          type="hidden"
          name="_next"
          value="https://bookokay.app/thank-you"
        ></input>
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
        <Select required name="_subject">
          <SelectTrigger className="w-[180px]" id="select">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Get a free sample">
                Get a free sample
              </SelectItem>
              <SelectItem value="repost a bug">Repost a bug</SelectItem>
              <SelectItem value="feature idea">Feature idea</SelectItem>
              <SelectItem value="label issue">Label issue</SelectItem>
              <SelectItem value="legal questions">Legal questions</SelectItem>
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
        <Button type="submit">Send messages</Button>
      </form>
    </main>
  );
}
