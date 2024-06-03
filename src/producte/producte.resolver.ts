import { Resolver,Query,Mutation ,Args} from "@nestjs/graphql";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { GraphQLError } from "graphql";


@Resolver()
export class ProducteResolver{

    @Query(()=> String)
    async hello():Promise<string>{
        return "Start Graphql One"
    }

    @Mutation(() => Boolean, { name: 'uploadImage' })
    async uploadImage(
        @Args({ name: 'image', type: () => GraphQLUpload })
        image: Upload,
       
    ) {
        const file = await image;
        file.filename = `${file.filename}_${Date.now()}.jpg`

        console.log(file)

        return new Promise((resolve, reject) => {
            try {
                const dirPath = join(__dirname, '/uploads');

                if (!existsSync(dirPath)) {
                    mkdirSync(dirPath, { recursive: true });
                }

                file
                    .createReadStream()
                    .pipe(createWriteStream(`${dirPath}/${file.filename}`))
                    .on('finish', () => {
                        resolve(true);
                    })
                    .on('error', error => {
                        reject(false);
                    });


            } catch (error) {
                throw new GraphQLError(`Error in Uplode image:\n${error}`)
            }

        });
    }

}
