export async function loadTemplate(path) {
    try {
      const res = await fetch(path);
      const templateText = await res.text();
      return templateText;
    } catch (error) {
      console.error(`Error loading template from ${path}:`, error);
      throw error;
    }
  }

export function renderWithTemplate(template, parentElement) {

parentElement.insertAdjacentHTML("afterbegin",template);
}
export async function loadHeaderFooter(){
try{
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if(headerElement){
    renderWithTemplate(headerTemplate,headerElement);
  }else{
    console.warn("Header element not found.");
  }
  if(footerElement){
    renderWithTemplate(footerTemplate,footerElement);
  }else{
    console.warn("Footer element not found.");
  }
}
catch (error){
  console.error("Error loading header or footer:", error);
}

}