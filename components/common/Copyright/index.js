const Copyright = ({ children }) => (
  <>
    <footer className="root">
      <p className="text">{children}</p>
    </footer>
    <style jsx>{`
      .root {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
      }
      .text {
        max-width: 400px;
        text-align: center;
        line-height: 1.15em;
      }
    `}</style>
  </>
);

export default Copyright;
