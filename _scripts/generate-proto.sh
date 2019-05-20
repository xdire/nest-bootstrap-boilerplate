#!/usr/bin/env bash
# @author Anton Repin <xdire>

# Define constants for support methods which are sensitive to CWD
INITIAL_EXEC_DIR="$(dirname "$0")"
SCRIPT_ROOT_PATH="$( cd "${INITIAL_EXEC_DIR}" && pwd )"
PROJECT_ROOT_PATH="${SCRIPT_ROOT_PATH}/..";

# Select all files in shared folder which has proto extension
protoFiles=$(find "${PROJECT_ROOT_PATH}/app/proto" -name '*.proto');

for i in "${!protoFiles[@]}"; do
	# Typescript execution string
	protoc \
	--plugin="protoc-gen-ts=${SCRIPT_ROOT_PATH}/../node_modules/.bin/protoc-gen-ts" \
	--js_out="import_style=commonjs,binary:app/proto-compiled" \
	--ts_out="service=true:app/proto-compiled" \
	--proto_path="${PROJECT_ROOT_PATH}/app/proto" \
	${protoFiles[$i]};
done;