# Backend-PostgreSQL

A backend microservice that do CRUD operations on a postgresql database for a todo app.

## Deploy

```bash
$ kubectl apply -k .
```

## Security

### prerequisites

make sure to install SOPS & age.

### Steps
create a key-pair first: This `key.txt` file now contains the public and secret keys

```bash
$ age-keygen -o key.txt
# Public key: PUBLIC_KEY
```

encrypt the values in the files you want
```bash
$ sops --encrypt \
       --age $(PUBLIC_KEY) \
       --encrypted-regex '^(data)$' \
       secret.yaml > secret.enc.yaml
```

the `SECRET_KEY` can be stored in GitHub secrets to be used in the build pipeline.
the `PUBLIC_KEY` can be with anyone in the team so they can encrypt secrets in the repo, and those secrets will be decoded in the pipeline.

You can decrypt the encrypted file by exporting the key file in SOPS_AGE_KEY_FILE environment variable and running sops with --decrypt flag.

```bash
$ export SOPS_AGE_KEY_FILE=$(pwd)/key.txt
$ sops --decrypt secret.enc.yaml > secret.yaml
```
You can also apply a secret yaml via piping directly, this helps avoid creating a plain secret.yaml file:

```bash
$ sops --decrypt secret.enc.yaml | kubectl apply -f -
```
