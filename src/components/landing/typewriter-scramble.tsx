import ScrambleHover from "@/sesame/components/text/scramble-hover"
import Typewriter from "@/sesame/components/text/typewriter"

export function TypewriterPreview() {
  return (
    <div className="w-dvw h-dvh md:text-3xl lg:text-4xl sm:text-2xl text-xl flex flex-row items-start justify-start bg-white text-foreground dark:text-muted font-normal overflow-hidden p-16 pt-48">
      <p className="whitespace-pre-wrap">
        <span>{"We're born 🌞 to "}</span>
        <Typewriter
          text={[
            "experience",
            "dance",
            "love",
            "be alive",
            "create things that make the world a better place",
          ]}
          speed={70}
          className="text-yellow-500 text-pretty"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </p>
    </div>
  )
}

export function ScramblePreview() {
  return (
    <div className="w-dvw h-dvh text-5xl font-calendas text-foreground dark:text-muted overflow-hidden p-8 pt-12 flex flex-col space-y-2 space-x-6">
      <ScrambleHover
        text={"simple scramble"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={true}
        className="cursor-pointer"
      />
      <ScrambleHover
        text={"cats & dogs"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer"
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
      />
      <ScrambleHover
        text={"hover me baby!!!"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer"
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
      />
    </div>
  )
}
