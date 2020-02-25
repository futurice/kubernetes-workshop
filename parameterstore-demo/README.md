# AWS Systems Manager Parameter Store Example

AWS SSM Walkthoughts available at: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-walk.html

Pre-requisites:
1. Create an KMS Key and appropriate IAM Roles

# Create or Update  Parameter
aws ssm put-parameter --name "username" --value "bruno" --type "String"
Note: use --overwrite for update

# Create or Update a SecureString Parameter
aws ssm put-parameter --name "password" --value "awesomepassword" --type "SecureString" --key-id "2171187c-21ab-4555-83b5-42be2765dfad"

# Get a Parameter
aws ssm get-parameters --names "username"

aws ssm get-parameters --names "password" --with-decryption
Note: If it's Secure String use  --with-decryption