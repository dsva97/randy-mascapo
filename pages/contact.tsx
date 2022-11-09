import { FormEventHandler, useState } from "react";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSending(true);
    const result = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ subject, content }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    alert(JSON.stringify(result, null, 3));
    setSending(false);
  };

  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={onSubmit}>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Asunto"
        />
        <textarea
          name=""
          placeholder="Mensaje"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" disabled={sending}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
