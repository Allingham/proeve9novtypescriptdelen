import Axios from "../../node_modules/axios/index"
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface Plante{
    "planteId": number,
    "planteType": string,
    "planteNavn": string,
    "price": number,
    "maksHoejde": number
}

let BaseURL = "https://planteapi.azurewebsites.net/planteinline";

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        input: "",
        planter: [],
        planteData: {planteType: "", planteNavn: "", price: undefined, maksHoejde: undefined},
        displayPlant: {planteId: undefined, planteNavn: "", price: undefined, maksHoejde: undefined},
        findPlant: ""
    },
    methods: {
        async GetAllPlantsAsync(){
            try{ return axios.get<Plante[]>(BaseURL)}
            catch(error: AxiosError){
                this.message = error.message;
                alert(error.message)
            }
        },
        async GetAllPlants(){
            let response = await this.GetAllPlantsAsync();
            this.planter = response.data;
        },

        GetPlantById(id: number){
            let URL = BaseURL+"/"+id;
            axios.get<Plante>(URL)
                .then((response: AxiosResponse<Plante>) => {
                    this.planter = [];
                    this.planter.push(response.data)
                })
                .catch((error: AxiosError) => {
                    this.message = error.message;
                    alert(error.message)
                })
        },

        GetPlantByname(name: string){
            let URL = BaseURL+"/ByName/"+name;
            axios.get<Plante>(URL)
                .then((response: AxiosResponse<Plante>) => {
                    this.displayPlant = response.data;
                })
                .catch((error: AxiosError) => {
                    this.message = error.message;
                    alert(error.message)
                })
        },

        async GetAllPlantsByTypeAsync(){
            let URL = BaseURL+"/bytype/"+this.input;
            try{ return axios.get<Plante[]>(URL)}
            catch(error: AxiosError){
                this.message = error.message;
                alert(error.message)
            }
        },

        async GetAllPlantsByType(){
            let response = await this.GetAllPlantsByTypeAsync();
            this.planter = response.data;
        },

        async AddPlantAsync(){
            try{ return axios.post<Plante>(BaseURL, this.planteData)
            }
            catch(error: AxiosError){
                this.message = error.message;
                alert(error.message)
            }
        },

        async AddPlant(){
            let response = await this.AddPlantAsync();
        }

    }
})