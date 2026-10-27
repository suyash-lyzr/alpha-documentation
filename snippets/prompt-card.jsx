// A prompt the reader can copy into Alpha's composer. Pass the prompt as a
// ```text code block child, which brings Mintlify's own copy button:
//
// <PromptCard label="Try this">
// ```text
// Build a class-booking app for a sailing school.
// ```
// </PromptCard>
export const PromptCard = ({ label = "Prompt", children }) => (
  <div className="prompt-card not-prose">
    <div className="prompt-card-label">{label}</div>
    {children}
  </div>
);
