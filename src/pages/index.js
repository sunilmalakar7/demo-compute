import React, { useEffect, useMemo, useState , useCallback} from 'react'

export default function Home() {

  useEffect(() => {

    document.title = "Homepage"
  }, [])

  return (
    <div
    // classNameName={roboto.classNameName}
    >
        <h1> Hello World </h1>
      {/* <MyComponent /> */}
      {/* <h1> Test Message Data</h1> */}
    </div>
  )
}


const MyComponent = () => {
  // const [showComponent, setShowComponent] = useState(true);

  // const memoizedComponent = useCallback(() => {
  //   return <MyOtherComponent  />;
  // }, []);

  // const toggleComponent = () => {
  //   setShowComponent(!showComponent);
  // };

  return (
    <div>
      {/* <button onClick={toggleComponent}>Toggle Component</button>
      {showComponent && memoizedComponent()} */}
      {/* <UsersPage /> */}
      {/* <ServerUsersPage /> */}
      <StaticUserPage />
      <StaticUser />
    </div>
  );
};

const MyOtherComponent = ({ showHideData }) => {
  return(
    <>

      <div>This is another component.</div>

      {showHideData && <h5> How hide div </h5>}
    </>
  );
};









const Data2 = () => {

  useEffect(() => {

    const scrollDemo = document.querySelector("#scrollDemo");
    const output = document.querySelector(".output");

    scrollDemo.addEventListener("scroll", event => {

      console.log('daraa', scrollDemo.scrollTop)
    }, { passive: false });

  }, [])

  return (
    <>

<div id="scrollDemo">
        <p>JavaScript scrollLeft / scrollTop</p>
    <div className="output" style={{ height: "300vh" }}></div>
    </div>

      {/* <div className="container">
        <header className="navbar-fixed-top cbp-af-header" id='scrollData'>
          <nav>
            <ul>
              <li className="logo"><a href="#"><i className="fa fa-file-code-o" aria-hidden="true"></i>

              </a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <button>Login</button>
        </header>

        <aside className="sidebar">
          <h3>Recent Posts</h3>
          <ul>
            <li><a href="#">Post One</a></li>
            <li><a href="#">Post Two</a></li>
            <li><a href="#">Post Three</a></li>
            <li><a href="#">Post Four</a></li>
            <li><a href="#">Post Five</a></li>
          </ul>
        </aside>

        <section className="main" style={{ height: "500vh" }}>
          <img title="Sticky Notes" src="https://abbeyjfitzgerald.com/wp-content/uploads/2017/12/sticky-notes.jpg" alt="Sticky Notes" />

          <h2>Sticky Positioning</h2>

          <p>Sticky positioning is a combo of relative and fixed positioning. It’s useful for any UI element that you want to be “sticky” as user’s are scrolling. Users see it get “stuck” it when element gets to a specific distance from the the edge of the viewport. </p>

          <p>We'll need a long page to demonstrate this. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
          <p> You'll see that the header stays in place when you scroll down.</p>
        </section>

        <footer>
          <h3>Sticky Positioning Example</h3>
          <p>Hope you enjoyed learning about how to make a sticky header!</p>
        </footer>
      </div> */}
    </>
  )
}
