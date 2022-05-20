package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.BoardFindRes;
import com.cdp.hanzoom.api.response.MatchingRes;

import java.util.List;

public interface MatchingService {
    MatchingRes findMatchingList(String userEmail, List<String> ingredients, Double distance);
    MatchingRes findRecipeMatchingList(String userEmail, Long recipeNo, Double distance);
}
