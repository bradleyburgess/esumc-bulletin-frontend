const Copyright = ({ children }) => (
  <>
    <footer className="copyright">
      <p className="text">{children}</p>
    </footer>
    <style jsx>{`
      .copyright {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
      }
      .text {
        max-width: 400px;
        font-style: italic;
        text-align: center;
        line-height: 1.15em;
      }
    `}</style>
  </>
);

export default Copyright;
