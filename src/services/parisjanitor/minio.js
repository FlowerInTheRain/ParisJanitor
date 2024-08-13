export class MinioClass {


    static bucketName = "parisjanitor"
    static endPoint = process.env.PARISJANITOR_MINIO_URL


    static getImageUrl(picturePath) {
        return `${this.endPoint}/${this.bucketName}/${picturePath}`
    }

}