#!/bin/bash
############ in aws-cli ####################  
#aws cloudformation package --template-file "awsflashgordon.sam.yml" --s3-bucket="awsflashgordon" --output-template-file "awsflashgordon.sam.output.yml"
#aws cloudformation deploy --template-file C:\Users\govrg\github\awsnode\awsflashgordon.sam.output.yml --stack-name awsflashgordon --capabilities CAPABILITY_IAM --parameter-overrides MissMode="Proxy" 
################
#./deploy.sh --bucket awsflashgordon --stack-name awsflashgordon --proxy proxy --region eu-west-1


TEMPLATE_FILE="awsflashgordon.sam.yml"
OUTPUT_TEMPLATE_FILE="awsflashgordon.sam.output.yml"

echo "Packaging AwsFlashGordon..."

npm install

aws cloudformation package --template-file $TEMPLATE_FILE \
                           --s3-bucket awsflashgordon \
                           --output-template-file $OUTPUT_TEMPLATE_FILE

echo "Deploying AwsFlashGordon..."

aws cloudformation deploy --template-file $OUTPUT_TEMPLATE_FILE \
                          --stack-name awsflashgordon \
                          --capabilities CAPABILITY_IAM \
                          --parameter-overrides MissMode="Proxy" \
                          --region eu-west-1


