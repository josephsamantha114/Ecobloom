
import { useState } from "react";
import "./SubmitIdea.css";

type SubmittedIdea = {
  id: number;
  title: string;
  category: string;
  description: string;
  materials: string;
  steps: string;
  status: "pending";
};

export default function SubmitIdea() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Plastic");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [steps, setSteps] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newIdea: SubmittedIdea = {
      id: Date.now(),
      title: title.trim(),
      category,
      description: description.trim(),
      materials: materials.trim(),
      steps: steps.trim(),
      status: "pending",
    };

    const existing: SubmittedIdea[] = JSON.parse(
      localStorage.getItem("ecobloom-submissions") || "[]"
    );

    localStorage.setItem(
      "ecobloom-submissions",
      JSON.stringify([...existing, newIdea])
    );

    setTitle("");
    setCategory("Plastic");
    setDescription("");
    setMaterials("");
    setSteps("");
    setSubmitted(true);
  }

  return (
    <section className="submit-section" id="share-idea">
      <div className="submit-intro">
        <span className="submit-eyebrow">ECOBLOOM COMMUNITY</span>

        <h2>Your Idea Could Inspire Someone.</h2>

        <p>
          Have a creative way to reuse everyday waste?
          Share your idea and help our community make
          a positive impact on the planet.
        </p>

        <div className="submit-note">
          🌱 Every small action can create a big change.
        </div>
      </div>

      <div className="submit-form-card">
        {submitted ? (
          <div className="submit-success">
            <span className="success-icon">🌿</span>
            <h3>Thank You for Sharing!</h3>
            <p>
              Your idea has been submitted and is
              waiting for review.
            </p>
            <button onClick={() => setSubmitted(false)}>
              Share Another Idea
            </button>
          </div>
        ) : (
          <>
            <h3>Share Your Upcycling Idea</h3>
            <p className="form-subtitle">
              Tell us about your creative project.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="idea-title">Idea Title</label>
              <input
                id="idea-title"
                type="text"
                placeholder="e.g. DIY Plastic Bottle Flower Pot"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
              />

              <label htmlFor="idea-category">
                Material Category
              </label>
              <select
                id="idea-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Plastic</option>
                <option>Glass</option>
                <option>Fabric</option>
                <option>Paper</option>
                <option>Other</option>
              </select>

              <label htmlFor="idea-description">
                Description
              </label>
              <textarea
                id="idea-description"
                placeholder="What is your idea about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />

              <label htmlFor="idea-materials">
                Materials Needed
              </label>
              <textarea
                id="idea-materials"
                placeholder="List the materials you need..."
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                required
                rows={3}
              />

              <label htmlFor="idea-steps">
                Step-by-Step Instructions
              </label>
              <textarea
                id="idea-steps"
                placeholder="Explain how to make your project..."
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
                rows={4}
              />

              <p className="review-message">
                🔒 Your idea will be reviewed before
                appearing on EcoBloom.
              </p>

              <button className="submit-button" type="submit">
                Submit My Idea →
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
