ARG REGISTRY="docker.io"
ARG BUILD_IMAGE='node'
ARG BUILD_TAG='lts-bookworm'
ARG BASE_IMAGE='nginxinc/nginx-unprivileged'
ARG BASE_TAG='stable-alpine'

ARG BASE_URL="/docs/"

FROM $REGISTRY/$BUILD_IMAGE:$BUILD_TAG AS builder
# copy all files not in .dockerignore
COPY ./ /tmp/src
WORKDIR /tmp/src

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

RUN npm install
RUN npm run build

FROM $REGISTRY/$BASE_IMAGE:$BASE_TAG

COPY --from=builder /tmp/src/build /usr/share/nginx/html/dist

EXPOSE 8080
