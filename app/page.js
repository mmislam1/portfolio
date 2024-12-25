import Image from "next/image";
import jsdom from 'jsdom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const skills = [{
    title: "React",
    star: 4,

  },
  {
    title: "Express.js",
    star: 4.5,
  }, {
    title: "MySQL",
    star: 4.5,
  }, {
    title: "MongoDB",
    star: 3.5,
  }]

  const projects = [{
    title: "Lose to gain",
    desc: "React for dynamic front end application.",
    tools: ['React','ExpressJS','MongoDB','NodeJS'],
  },
  {
    title: "Metrorail",
    desc: "React for dynamic front end application.",
    tools: ["PHP",'MySQL'],
  },
  ]


  return (
    <div className="grid grid-cols-1 bg-slate-500 font-sans text-white bg-slate-900">


      <div className=" grid items-center justify-center p-8 font-semibold text-lg lg:px-72">
        <div className=" grid items-center justify-around grid-cols-1">
          <div className="flex flex-col-reverse items-center justify-around gap-9 md:flex-row">
            <div className="flex flex-col items-center justify-around gap-9">
              <p className="regulartext " id="about">I am Mohaiminul Islam. A MERN stack developer. Specialize in both relational and non-relational database. </p>
              

            </div>
            <div className="min-h-60 min-w-60 max-h-60 max-w-60 border-2 border-amber-400 bg-white rounded-full overflow-hidden">
              <img src="../mm.jpg" alt="mm" />
            </div>
          </div>

          <div className="flex flex-row m-10 items-center justify-center">
            <button className="bg-amber-400 border-2 border-amber-400 text-slate-900 text-2xl px-8 p-2 font-semibold rounded hover:bg-slate-900 hover:text-amber-400 m-10"><a href="https://drive.google.com/file/d/1PN9v4fXd6DuopgR9tGupJshRp0AhurtF/view?usp=sharing">Resume</a></button>

            <a href="https://github.com/mmislam1" className="m-10">
              <FontAwesomeIcon icon={faGithub} className="text-amber-400 text-5xl hover:text-orange-600"></FontAwesomeIcon>
            </a>
            <a href="https://www.linkedin.com/in/mohaiminul-islam-29a454139/" className="m-10">
              <FontAwesomeIcon icon={faLinkedin} className="text-amber-400 hover:text-orange-600 text-5xl"></FontAwesomeIcon>
            </a>

          </div>


          <h2 className="text-amber-400 font-semibold text-4xl mt-10 m-auto" id="skills">SKILLS</h2>

          <div className=" grid grid-cols-1 items-center justify-between gap-6 p-5 my-6 border-2 border-slate-500 bg-slate-700 rounded-xl md:grid-cols-2 xl:grid-cols-3">
            {
              skills.map((skill) => {

                let stars = []
                for (let i = 0; i < 5; i++) {

                  if (i + 1 <= skill.star) { stars.push(<img key={i} src="full.png" width="30px" padding="10px"></img>); }
                  else {
                    if (skill.star === i + .5) {
                      stars.push(<img key={i} src="half.png" width="30px" padding="10px"></img>);
                    }
                    else {
                      stars.push(<img key={i} src="empty.png" width="30px" padding="10px"></img>);
                    }
                  }

                }

                return (
                  <div key={skill.title} className="grid grid-cols-1 items-center justify-center bg-slate-900 border-2 border-slate-500 p-5 rounded-md">
                    <h2 className="text-amber-400 font-semibold md:text-xl xl:text-2xl mb-4 m-auto">{skill.title}</h2>

                    <div className="grid grid-cols-5 items-center justify-center  border-1 border-slate-500 p-5 rounded-md">

                      {stars}

                    </div>
                  </div>)
              })
            }

          </div>
          <h3 className="text-amber-400 font-semibold text-4xl mt-10 m-auto" id="projects">PROJECTS</h3>

          <div className="grid grid-cols-1 items-center justify-between gap-6 py-5 my-4 ">
            {projects.map((project) => {
              const tools = []
              project.tools.map((tool) => {
                tools.push(<h4 key={project+tool} className="text-amber-400 text-xl m-2">{tool} </h4>)
              })

              return (<div key={project.title} className=" bg-slate-900 border-2 border-amber-400 p-5 rounded-md">
                <h4 className="text-amber-400 font-semibold text-2xl mb-4 m-auto">{project.title} </h4>
                <p className="regulartext mb-4 bg-slate-700 p-2 rounded-md">{project.desc}</p>
                <div className="flex flex-row flex-wrap">
                  {tools}
                 </div>
              </div>)
            })
            }
          </div>

          <div className="contact section grid grid-cols-1  ">
            <h3 className="text-amber-400 font-semibold text-4xl mt-10 m-auto" id="contact">CONTACT</h3>
            <form className="mt-10 grid grid grid-cols-1 gap-4 items-center justify-center lg:grid-cols-2  " action="https://formspree.io/f/xzzppron" method="POST">


              <input className="p-2 rounded-md text-xl border-2 border-amber-400 font-semibold lg:col-start-1 bg-slate-900 text-amber-400 lg:col-span-1" type="text" name="name" placeholder="Name" />


              <input className="p-2 rounded-md text-xl border-2 border-amber-400 font-semibold lg:col-start-1 bg-slate-900 text-amber-400 lg:col-span-1" type="text" name="phone" placeholder="Phone Number" />


              <input className="p-2 rounded-md text-xl border-2 border-amber-400 font-semibold lg:col-start-1 bg-slate-900 text-amber-400 lg:col-span-1" type="email" name="email" placeholder="Email" />


              <textarea className="p-2 rounded-md text-xl border-2 border-amber-400 font-semibold lg:col-start-1 bg-slate-900 text-amber-400 lg:col-span-1" name="message" placeholder="Write to Author"></textarea>


              <div className="p-6 grid items-center lg:col-start-1">
                <button className="bg-amber-400 border-2 border-amber-400 text-slate-900 text-2xl px-8 p-2 font-semibold rounded hover:bg-slate-900 hover:text-amber-400 " type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
