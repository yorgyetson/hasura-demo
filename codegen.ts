import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://organic-yeti-59.hasura.app/v1/graphql',
    documents: './src/**/*.gql',
    generates: {
        './graphql/generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node', '@kitql/graphql-codegen']
        }
    }
}
export default config