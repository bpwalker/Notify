package ittouch

import grails.converters.JSON

class TemplateFilters {

    def filters = {
        all(controller:'template', action:'*') {
            before = {
				try{
					WhiteList.checkWhiteList(params.resource);
				} catch(Exception e){
					response.sendError(500);
					return false;
				}
            }
            after = {
                
            }
            afterView = {
                
            }
        }
    }
}
