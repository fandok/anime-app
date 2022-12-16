// src/mocks/handlers.js
import { rest } from "msw";
import { MAIN_API } from "../../constants";
import { mockDetailResponse } from "./__data_mocks__/detail.mock";
import { mockListResponse } from "./__data_mocks__/index.mock";

export const handlers = [
  rest.get(MAIN_API, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockListResponse));
  }),

  rest.get(`${MAIN_API}/44511`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDetailResponse));
  }),
];
