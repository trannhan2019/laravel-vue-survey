import axiosClient from "./axiosClient";

const surveyService = {
  getAll(){
    const url = "/survey";
    return axiosClient.get(url);
  },
  getOne(id){
    const url = `/survey/${id}`;
    return axiosClient.get(url);
  },
  getSlug(slug){
    const url = `/survey-by-slug/${slug}`;
    return axiosClient.get(url);
  },
  create(survey){
    const url = "/survey";
    return axiosClient.post(url,survey);
  },
  update(survey){
    const url = `/survey/${survey.id}`;
    return axiosClient.put(url,survey);
  },
  delete(id){
    const url = `/survey/${id}`;
    return axiosClient.delete(url);
  },
  saveAnswer(surveyId, answers){
    const url = `/survey/${surveyId}/answer`;
    return axiosClient.post(url,{answers});
  }
}

export default surveyService;
