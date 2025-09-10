import img1 from '../assets/ReactB.png'
import img2 from '../assets/Advancejs.jpeg'
import img3 from '../assets/Tailwind.jpeg'


const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the fundamentals of React, hooks, and components.",
    instructor: "John Doe",
    image: img1
  },

  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into closures, async, promises, and ES6+.",
    instructor: "Jane Smith",
    image: img2,
    lessons: [
      { id: "l1", title: "Scopes & Hoisting", url: "https://www.youtube.com/watch?v=Nt-qa_LlUH0" },
      { id: "l2", title: "Closures Deep Dive", url: "https://www.youtube.com/watch?v=1JsJx1x35c0" },
      { id: "l3", title: "Promises & Async", url: "https://www.youtube.com/watch?v=PoRJizFvM7s" }
]
  },
  {
    id: 3,
    title: "Tailwind CSS Mastery",
    description: "Master utility-first styling with Tailwind CSS.",
    instructor: "Alex Johnson",
    image: img3,
  },
];

export default courses;
