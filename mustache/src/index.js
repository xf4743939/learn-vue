
import parseTemplateTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'


window.SSG_TemplateEngine={
  render(templateStr,data){

    const tokens =parseTemplateTokens(templateStr);
    const result = renderTemplate(tokens,data);
    return result
  }
}
