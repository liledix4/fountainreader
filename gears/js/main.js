const screenplay = document.getElementById( 'screenplay' );
const urlParams = new URLSearchParams( window.location.search );
const scriptUrl = urlParams.get( 'url' );

if ( scriptUrl ) {
  fetch( scriptUrl )
    .then( response => {
      if ( !response.ok ) throw new Error( "Could not fetch the source file." );
      return response.text();
    } )
    .then( fountainText => {
      const output = fountain.parse( fountainText );
      console.log( output );

      let fullContent = "";
      if ( output.html.title_page ) {
        fullContent += output.html.title_page + "<hr style='border: none; border-top: 1px dashed #ccc; margin: 40px 0;'>";
      }
      fullContent += output.html.script;

      screenplay.innerHTML = fullContent;
    } )
    .catch( err => {
      screenplay.innerText = "Parsing Error: " + err.message;
    } );
} else {
  screenplay.innerText = "Error: Please pass a script link via the URL parameters. Example: https://liledix4.github.io/fountainreader?url=https://example.org/script.fountain";
}