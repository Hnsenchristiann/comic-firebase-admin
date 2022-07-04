/* eslint-disable */
// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import { collection, getDocs } from 'firebase/firestore'

export default class extends Subcollection {
    static collection = 'page'
    static fields = {
      page_number: Number,
      page_image_url: String,
      is_ar: Boolean,
      config: Object,
      media_type: String,
      scenes: Subcollection.resolve('./Scenes.js'),
      scenes_data: Array,
      ar_button_show_time: Object

    }
    
    static async getPages(path){
        const page = await this.getDocuments(path)
        return page
    }

    async getScenes () {
      const { path } = this.getObjectPath()
      const sceneDoc = collection(this.constructor.db, 'comics', path.comics, 'chapters', path.chapters, 'pages', path.pages, 'scenes')
      return await getDocs(sceneDoc)
    }
}
