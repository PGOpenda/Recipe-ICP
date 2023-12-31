# Recipe Panel

## Overview
This smart contract implements a recipe panel using the typescript on azle for internet Computer. The system allows for creation, deletion, renovation and querying of cooking recipes. The cooking recipes entail a title, ingredients and its accompanying preparation instructions. 

## Prerequisites
- Node
- Typescript
- DFX
- IC CDK
  
## Installation

#### Clone the repository in your terminal:

`git clone https://github.com/PGOpenda/Recipe-ICP.git
`

#### Move into the directory
`cd Recipe-ICP`

## Methods
#### `addRecipe`
- Initialize a new recipe

#### `deleteRecipe`
- Delete an existing recipe

#### `getRecipeById`
- Query for any existing recipe by its unique identifier

#### `getRecipes`
- Query all existing recipes

#### `updateRecipe`
- Update a recipe using its unique identifier 


## Try it out
`dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

`npm run dfx_install`

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:

`npm run replica_start`

To stop the replica:

`npm run replica_stop`

Now you can deploy your canister locally:

`npm install`

`npm run canister_deploy_local`

To call the methods on your canister:

`npm run name_of_function`

Assuming you have created a cycles wallet and funded it with cycles, you can deploy to mainnet like this:

`npm run canister_deploy_mainnet`
