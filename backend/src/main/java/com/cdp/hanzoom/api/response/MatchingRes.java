package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("MatchingRes")
public class MatchingRes {
    List<String> notFound;
    List<MatchingFindRes> matchingList;
}
