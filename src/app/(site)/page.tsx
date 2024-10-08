import Image from 'next/image'

export default async function Home() {

  return (
    <>
      <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        <div className="absolute bottom-0 left-0 right-0 top-10 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <div className='pt-[500px]'>
          <p className="text-center italic">Ever wondered what happens when a coder meets a README.md file? Sparks fly, and magic happens! 💥✨</p>
          <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
            <h1 className="text-6xl font-bold text-center md:text-[200px]">
              README.md
            </h1>
          </div>
          <div className="flex justify-center items-center relative md:mt-[-30px]">
              <Image
                src={'/assets/dashboard-light.png'}
                alt="banner image"
                height={1200}
                width={1200}
                className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted dark:hidden block"
              />
              <Image
                src={'/assets/dashboard-dark.png'}
                alt="banner image"
                height={1200}
                width={1200}
                className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted hidden dark:block"
              />
            <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
         
      </section>
    </>
  )
}
