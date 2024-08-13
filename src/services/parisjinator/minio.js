export class MinioClass {


    static bucketName = "dndgate"
    static endPoint = process.env.DNDGATE_MINIO_URL


    static getImageUrl(picturePath) {
        return `${this.endPoint}/${this.bucketName}/${picturePath}`
    }

}