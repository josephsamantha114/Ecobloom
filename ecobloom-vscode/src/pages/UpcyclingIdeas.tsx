
import { useState } from "react";
import "./UpcyclingIdeas.css";

import SubmitIdea from "./SubmitIdea";


const projects = [
  {
    id: 1,
    title: "Plastic Bottle Planter",
    category: "Plastic",
    difficulty: "Easy",
    image: `${import.meta.env.BASE_URL}images/bottle-planter.jpg`,
    description: "Turn an empty bottle into a home for a small plant.",
    materials: [
      "Clean plastic bottle",
      "Soil",
      "Seeds or small plant",
      "Scissors"
    ],
    steps: [
      "Wash and dry the plastic bottle.",
      "Carefully cut an opening in the bottle. Ask an adult for help if needed.",
      "Make small drainage holes carefully.",
      "Add soil and place your plant inside.",
      "Water lightly and place it near natural light."
    ]
  },
  {
    id: 2,
    title: "Glass Jar Organizer",
    category: "Glass",
    difficulty: "Easy",
    image: `${import.meta.env.BASE_URL}images/glass-jar.jpg`,
    description: "Give an empty jar a new purpose on your desk.",
    materials: [
      "Clean glass jar",
      "Ribbon or twine",
      "Paper labels",
      "Pens or pencils"
    ],
    steps: [
      "Wash the jar and remove its label.",
      "Dry it completely.",
      "Decorate the outside with ribbon or twine.",
      "Place pencils, brushes or stationery inside."
    ]
  },
  {
    id: 3,
    title: "Old T-Shirt Tote Bag",
    category: "Fabric",
    difficulty: "Medium",
    image: `${import.meta.env.BASE_URL}images/tshirt-tote.jpg`,
    description: "Make a reusable shopping bag from an old T-shirt.",
    materials: [
      "Old T-shirt",
      "Fabric scissors",
      "Ruler"
    ],
    steps: [
      "Lay the T-shirt flat.",
      "Cut off the sleeves and widen the neckline.",
      "Cut strips along the bottom edge.",
      "Tie the front and back strips together securely.",
      "Turn the bag inside out and check the knots."
    ]
  },
  {
    id: 4,
    title: "Cardboard Desk Organizer",
    category: "Paper",
    difficulty: "Easy",
    image: `${import.meta.env.BASE_URL}images/cardboard-organizer.jpg`,
    description: "Transform cardboard packaging into useful storage.",
    materials: [
      "Clean cardboard boxes",
      "Glue",
      "Colored paper",
      "Scissors"
    ],
    steps: [
      "Choose a few small cardboard boxes.",
      "Arrange them into compartments.",
      "Trim them carefully to suitable heights.",
      "Glue the boxes together.",
      "Decorate them and let the glue dry."
    ]
  }
];

const categories = ["All", "Plastic", "Glass", "Fabric", "Paper"];

export default function UpcyclingIdeas() {
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = projects.filter(
    (project) =>
      category === "All" || project.category === category
  );

  return (
    <main className="ideas-page">
      <section className="ideas-hero">
        <span className="ideas-eyebrow">
          ECOBLOOM / UPCYCLING IDEAS
        </span>

        <h1>Give Waste a Second Life.</h1>

        <p>
          Discover creative ways to transform everyday
          waste into something beautiful and useful.
        </p>
      </section>

      <section className="ideas-content">
        <div className="ideas-heading">
          <div>
            <span className="ideas-eyebrow dark">
              EXPLORE BY MATERIAL
            </span>
            <h2>Small ideas. Big possibilities.</h2>
          </div>

          <p>{filtered.length} projects to explore</p>
        </div>

        <div className="ideas-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => {
                setCategory(item);
                setSelectedId(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="ideas-grid">
          {filtered.map((project) => (
            <article className="idea-card" key={project.id}>
              <div className="idea-art">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              </div>

              <div className="idea-card-body">
                <span className="idea-tag">
                  {project.category} · {project.difficulty}
                </span>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <button
                  className="idea-action"
                  onClick={() =>
                    setSelectedId(
                      selectedId === project.id ? null : project.id
                    )
                  }
                >
                  {selectedId === project.id
                    ? "Hide Steps −"
                    : "View Steps →"}
                </button>

                {selectedId === project.id && (
                  <div className="idea-details">
                    <h4>What you'll need</h4>
                    <ul>
                      {project.materials.map((material) => (
                        <li key={material}>{material}</li>
                      ))}
                    </ul>

                    <h4>Step-by-step guide</h4>
                    <ol>
                      {project.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
     
      </section>

      <SubmitIdea />
    </main>
  );
}

